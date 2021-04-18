package me.ajfleming.inventory.service;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import lombok.RequiredArgsConstructor;
import me.ajfleming.inventory.model.Game;
import me.ajfleming.inventory.model.Item;
import me.ajfleming.inventory.model.Role;
import me.ajfleming.inventory.socket.event.ItemEvent;
import me.ajfleming.inventory.user.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SocketEventService {
  public final SocketIOServer socketIOServer;
  public final UserManager userManager;

  public void loginPlayerToComms(SocketIOClient client, Role role) {
    client.joinRoom("/player/"+ role.getId());
  }

  public void loginHostToComms(SocketIOClient client, Game game) {
    client.joinRoom("/host/"+ game.getId());
  }

  public void sendGameUpdateToHost(Game game) {
    sendEventToHost(game, "GAME_UPDATE", game);
  }

  public void sendHostItemUpdate(Game game, Item item) {
    sendEventToHost(game, "ITEM_UPDATE", new ItemEvent(item.getItemOwner(), item));
  }

  public void sendItemUpdate(Game game, Item item) {
    if(item.isHidden()) {
      sendEventToPlayer(item.getItemOwner(), "ITEM_REMOVED", item.getId());
    } else {
      sendEventToPlayer(item.getItemOwner(), "ITEM_ADDED", item);
    }
  }

  public void sendHostRoleUpdate(Game game, Role role) {
    sendEventToHost(game, "ROLE_UPDATE", role);
  }

  public void sendEventToPlayer(Role role, String eventName, Object payload) {
    socketIOServer.getRoomOperations(getPlayerRoomName(role)).sendEvent(eventName, payload);
  }

  public void sendEventToHost(Game game, String eventName, Object payload) {
    socketIOServer.getRoomOperations(getHostRoomName(game)).sendEvent(eventName, payload);
  }

  private String getPlayerRoomName(Role role) {
    return "/player/" + role.getId();
  }

  private String getHostRoomName(Game game) {
    return "/host/" + game.getId();
  }
}
