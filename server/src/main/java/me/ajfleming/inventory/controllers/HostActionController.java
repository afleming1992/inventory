package me.ajfleming.inventory.controllers;

import com.corundumstudio.socketio.SocketIOClient;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import me.ajfleming.inventory.db.GameRepository;
import me.ajfleming.inventory.db.ItemRepository;
import me.ajfleming.inventory.db.RoleRepository;
import me.ajfleming.inventory.model.Game;
import me.ajfleming.inventory.model.Item;
import me.ajfleming.inventory.service.SocketEventService;
import me.ajfleming.inventory.socket.action.ItemAction;
import me.ajfleming.inventory.socket.action.ItemCreationAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import me.ajfleming.inventory.model.Role;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class HostActionController {

  private final GameRepository gameRepository;
  private final RoleRepository roleRepository;
  private final ItemRepository itemRepository;
  private final SocketEventService socketService;

  public Game createGame(SocketIOClient client) {
    Game game = Game.builder().newGame().build();
    game = gameRepository.save(game);
    return game;
  }

  public Optional<Game> loadGame(long gameId, String hostKey) {
    Optional<Game> game = gameRepository.findById(gameId);
    if(game.isPresent() && game.get().getHostGameKey().equals(hostKey)){
      return game;
    } else {
      return Optional.empty();
    }
  }

  public Optional<Game> loadGame(long gameId) {
    return gameRepository.findById(gameId);
  }

  public void addRoleToGame(Game game, String playerName, boolean hidden) {
    Role player = Role.builder()
        .newRole()
        .roleName(playerName)
        .hidden(hidden)
        .build();
    game.addRole(player);
    game = gameRepository.save(game);
    socketService.sendGameUpdateToHost(game);
  }

  public void addItemToRole(Game game, ItemCreationAction itemCreationAction) {
    game.findRoleById(itemCreationAction.getRoleId(), false).ifPresent(
      role -> {
        Item item = Item.builder()
            .name(itemCreationAction.getName())
            .description(itemCreationAction.getDescription())
            .imageUrl(itemCreationAction.getImageUrl())
            .build();
        role.addItem(item);
      }
    );
    game = gameRepository.save(game);
    socketService.sendGameUpdateToHost(game);
  }

  public void updateRole(Game game, Role updatedRole) {
    game.findRoleById(updatedRole.getId(), false).ifPresent(
      role -> {
        role.updateRole(updatedRole);
      }
    );
    game = gameRepository.save(game);
    socketService.sendGameUpdateToHost(game);
  }

  public void updateItem(Game game, Item updatedItem) {
    Optional<Item> itemResult = itemRepository.findById(updatedItem.getId());
    if(itemResult.isPresent()) {
      Item item = itemResult.get().updateItem(updatedItem);
      itemRepository.save(item);
      socketService.sendEventToPlayer(item.getItemOwner(),"ITEM_UPDATE", item);
      socketService.sendEventToHost(game, "ITEM_UPDATE", item);
    }
  }

  public void moveItem(Game game, ItemAction action) {
    Optional<Item> itemResult = itemRepository.findById(action.getItemId());
    Optional<Role> roleResult = roleRepository.findById(action.getRecipientRoleId());
    if(itemResult.isPresent() && roleResult.isPresent()) {
      Item item = itemResult.get();
      Role newOwner = roleResult.get();
      Role previousOwner = item.getItemOwner();
      item.setItemOwner(roleResult.get());
      itemRepository.save(item);
      socketService.sendEventToPlayer(previousOwner, "ITEM_REMOVED", item.getId());
      socketService.sendEventToPlayer(newOwner, "ITEM_ADDED", item);
      socketService.sendEventToHost(game, "ITEM_UPDATE", item);
    }
  }

  public void changeItemVisibility(Game game, ItemAction action) {
    Optional<Item> itemResult = itemRepository.findById(action.getItemId());
    if(itemResult.isPresent()) {
      Item item = itemResult.get();
      item.setHidden(action.isHidden());
      itemRepository.save(item);
      socketService.sendItemUpdate(game, item);
    }
  }

  public void useItem(Game game, ItemAction action) {
    Optional<Item> itemResult = itemRepository.findById(action.getItemId());
    if(itemResult.isPresent()) {
      Item item = itemResult.get();
      item.useItem();
      itemRepository.save(item);
      socketService.sendItemUpdate(game, item);
    }
  }
}