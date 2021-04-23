package me.ajfleming.inventory.controllers;

import com.corundumstudio.socketio.SocketIOClient;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import me.ajfleming.inventory.db.ItemRepository;
import me.ajfleming.inventory.db.RoleRepository;
import me.ajfleming.inventory.model.Game;
import me.ajfleming.inventory.model.Item;
import me.ajfleming.inventory.model.Role;
import me.ajfleming.inventory.service.SocketEventService;
import me.ajfleming.inventory.socket.action.ItemAction;
import me.ajfleming.inventory.socket.action.ItemUpdateAction;
import me.ajfleming.inventory.socket.event.ItemEvent;
import me.ajfleming.inventory.socket.response.Response;
import me.ajfleming.inventory.user.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PlayerActionController {

  private final RoleRepository roleRepository;
  private final ItemRepository itemRepository;
  private final UserManager userManager;
  private final SocketEventService socketEventService;

  public Optional<Role> loadRole(Game game, String joinCode) {
    return game.findRoleByJoinCode(joinCode);
  }

  public void setupPlayerOnLogin(SocketIOClient client, Game game, Role role) {
    socketEventService.loginPlayerToComms(client, game, role);
    socketEventService.sendEventToPlayer(role, "ROLE_UPDATE", role.toPlayerView(true)) ;
    socketEventService.sendEventToPlayer(role, "OTHER_ROLES_UPDATE", game.getVisibleRolesPlayerView());
  }

  public void showItem(Game game, long requestorRoleId, ItemAction itemAction) {
    Optional<Role> requestorRole = game.findRoleById(requestorRoleId, true);
    Optional<Role> recipientRole = game.findRoleById(itemAction.getRecipientRoleId(), true);
    if (requestorRole.isPresent() && recipientRole.isPresent()) {
      Optional<Item> itemResult = requestorRole.get().findItemById(itemAction.getItemId(), true);
      if (itemResult.isPresent()) {
        socketEventService.sendEventToPlayer(recipientRole.get(), "SHOWN_ITEM",
            new ItemEvent(requestorRole.get().toPlayerView(false), itemResult.get().toPlayerView()));
        socketEventService.sendEventToPlayer(requestorRole.get(), "SHOW_ITEM_SUCCESS", Response
            .success(recipientRole.get().getRoleName() + " has been shown " + itemResult.get()
                .getName()));
      } else {
        socketEventService.sendEventToPlayer(requestorRole.get(), "GAME_ERROR",
            Response.error("Item is not in your inventory"));
      }
    }
  }

  public void giveItem(Game game, long requestorRoleId, ItemAction itemAction) {
    Optional<Role> requestorRole = game.findRoleById(requestorRoleId, true);
    Optional<Role> recipientRole = game.findRoleById(itemAction.getRecipientRoleId(), true);
    if (requestorRole.isPresent() && recipientRole.isPresent()) {
      Optional<Item> itemResult = requestorRole.get().findItemById(itemAction.getItemId(), true);
      if (itemResult.isPresent() && itemResult.get().isSwappable()) {
        socketEventService.sendEventToPlayer(requestorRole.get(), "ITEM_REMOVED", itemAction.getItemId());
        moveItemToRole(recipientRole.get(), itemResult.get());
        socketEventService.sendEventToPlayer(recipientRole.get(), "ITEM_ADDED", new ItemEvent(recipientRole.get().toPlayerView(false), itemResult.get().toPlayerView()));
        socketEventService.sendEventToHost(game, "ITEM_REMOVED", new ItemUpdateAction(requestorRole.get().getId(), itemResult.get()));
        socketEventService.sendEventToHost(game, "ITEM_ADDED", new ItemUpdateAction(recipientRole.get().getId(), itemResult.get()));
      } else {
        socketEventService.sendEventToPlayer(requestorRole.get(), "GAME_ERROR",
            "Item is not in your inventory or is not swappable");
      }
    }
  }

  private void moveItemToRole(Role recipient, Item item) {
    item.setItemOwner(recipient);
    itemRepository.save(item);
  }
}
