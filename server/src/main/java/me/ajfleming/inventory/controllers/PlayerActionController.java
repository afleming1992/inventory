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

  public void setupPlayerOnLogin(SocketIOClient client, Role role) {
    socketEventService.loginPlayerToComms(client, role);
    socketEventService.sendEventToPlayer(role, "ROLE_UPDATE", role);
    socketEventService.sendEventToPlayer(role, "ITEMS_UPDATE", role.getVisibleItemsList());
  }

  public void showItem(Game game, long requestorRoleId, ItemAction itemAction) {
    Optional<Role> requestorRole = game.findRoleById(requestorRoleId, true);
    Optional<Role> recipientRole = game.findRoleById(itemAction.getRecipientRoleId(), true);
    if (requestorRole.isPresent() && recipientRole.isPresent()) {
      Optional<Item> itemResult = requestorRole.get().findItemById(itemAction.getItemId(), true);
      if (itemResult.isPresent()) {
        socketEventService.sendEventToPlayer(recipientRole.get(), "SHOWN_ITEM",
            new ItemEvent(requestorRole.get(), itemResult.get()));
        socketEventService.sendEventToPlayer(requestorRole.get(), "SHOW_ITEM_SUCCESS", Response
            .success(recipientRole.get().getRoleName() + " has been shown " + itemResult.get()
                .getName()));
      } else {
        socketEventService.sendEventToPlayer(requestorRole.get(), "SHOW_ITEM_ERROR",
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
        socketEventService
            .sendEventToPlayer(requestorRole.get(), "ITEM_REMOVED", itemAction.getItemId());
        moveItemToRole(recipientRole.get(), itemResult.get());
        socketEventService.sendEventToPlayer(recipientRole.get(), "ITEM_ADDED",
            new ItemEvent(recipientRole.get(), itemResult.get()));
      } else {
        socketEventService.sendEventToPlayer(requestorRole.get(), "GIVE_ITEM_ERROR",
            "Item is not in your inventory or is not swappable");
      }
    }
  }

  private void moveItemToRole(Role recipient, Item item) {
    item.setItemOwner(recipient);
    itemRepository.save(item);
  }
}
