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
import me.ajfleming.inventory.socket.action.ItemUpdateAction;
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

  public Game createGame() {
    Game game = Game.builder().newGame().build();
    game = gameRepository.save(game);
    return game;
  }

  public Optional<Game> loadGame(String hostKey) {
    return gameRepository.findByHostKey(hostKey);
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

  public void addItemToRole(Game game, ItemUpdateAction itemAction) {
    Optional<Role> roleResult = game.findRoleById(itemAction.getRoleId(), false);
    if(roleResult.isPresent()) {
      Role role = roleResult.get();
      Item item = itemAction.getItem();
      item.setItemOwner(role);
      item = itemRepository.save(item);
      role.addItem(item);
      socketService.sendHostRoleUpdate(game, role);
      socketService.sendItemUpdate(game, item);
    }
  }

  public void updateRole(Game game, Role updatedRole) {
    Optional<Role> roleResult = game.findRoleById(updatedRole.getId(), false);
    if(roleResult.isPresent()) {
      Role role = roleResult.get();
      role.updateRole(updatedRole);
      roleRepository.save(role);
      socketService.sendHostRoleUpdate(game, role);
    }
  }

  public void updateItem(Game game, ItemUpdateAction itemAction) {
    Optional<Role> roleResult = game.findRoleById(itemAction.getRoleId(), false);
    if(roleResult.isPresent()) {
      Role role = roleResult.get();
      Item item = itemAction.getItem();
      item.setItemOwner(role);
      itemRepository.save(item);
      socketService.sendItemUpdate(game, item);
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
      item = itemRepository.save(item);
      socketService.sendItemUpdate(game, item);
      socketService.sendHostRoleUpdate(game, item.getItemOwner());
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
