package me.ajfleming.inventory.socket.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.annotation.OnEvent;
import lombok.RequiredArgsConstructor;
import me.ajfleming.inventory.controllers.HostActionController;
import me.ajfleming.inventory.model.Game;
import me.ajfleming.inventory.model.Item;
import me.ajfleming.inventory.model.Role;
import me.ajfleming.inventory.service.SocketEventService;
import me.ajfleming.inventory.socket.action.ItemAction;
import me.ajfleming.inventory.socket.action.ItemCreationAction;
import me.ajfleming.inventory.socket.action.ItemUpdateAction;
import me.ajfleming.inventory.socket.event.LoginEvent;
import me.ajfleming.inventory.socket.event.RoleEvent;
import me.ajfleming.inventory.socket.response.Response;
import me.ajfleming.inventory.user.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class HostEventListeners extends RequestListener {
  private final HostActionController hostActionController;
  private final SocketEventService socketService;
  private final UserManager userManager;

  @OnEvent("HOST_CREATE_GAME")
  public void onCreateGame(SocketIOClient client) {
    Game game = hostActionController.createGame();
    userManager.connectHost(client, game.getId());
    client.sendEvent("HOST_LOGIN_SUCCESS", game);
  }

  @OnEvent("HOST_LOGIN")
  public void onLoginToGame(SocketIOClient client, LoginEvent loginEvent) {
      hostActionController.loadGame(loginEvent.getHostKey()).ifPresentOrElse(game -> {
        userManager.connectHost(client, game.getId());
        socketService.loginHostToComms(client, game);
        client.sendEvent("HOST_LOGIN_SUCCESS", game);
      }, () -> {
        client.sendEvent("HOST_LOGIN_ERROR", Response.error("Game not found"));
      });
  }

  @OnEvent("HOST_CREATE_ROLE")
  public void onCreateCharacter(SocketIOClient client, RoleEvent roleEvent) {
    userManager.findConnectedHost(client).ifPresent(host ->
      hostActionController.loadGame(host.getGameId()).ifPresentOrElse(
      game -> hostActionController.addRoleToGame(game, roleEvent.getName(),roleEvent.isHidden()),
      () -> client.sendEvent("HOST_CREATE_ROLE_ERROR", Response.error("Game not found"))
    ));
  }

  @OnEvent("HOST_CREATE_ITEM")
  public void onCreateItem(SocketIOClient client, ItemUpdateAction itemAction) {
    userManager.findConnectedHost(client).ifPresent(host ->
      hostActionController.loadGame(host.getGameId()).ifPresentOrElse(
      game -> hostActionController.addItemToRole(game, itemAction),
      () -> client.sendEvent("HOST_CREATE_ITEM_ERROR", Response.error("Game not found"))
    ));
  }

  @OnEvent("HOST_UPDATE_ROLE")
  public void onUpdateRole(SocketIOClient client, Role updatedRole) {
    userManager.findConnectedHost(client).ifPresent(host ->
      hostActionController.loadGame(host.getGameId()).ifPresentOrElse(
      game -> hostActionController.updateRole(game, updatedRole),
      () -> client.sendEvent("HOST_UPDATE_ROLE_ERROR", Response.error("Game not found"))
    ));
  }

  @OnEvent("HOST_UPDATE_ITEM")
  public void onUpdateItem(SocketIOClient client, ItemUpdateAction itemAction) {
    userManager.findConnectedHost(client).ifPresent(host ->
      hostActionController.loadGame(host.getGameId()).ifPresentOrElse(
      game -> hostActionController.updateItem(game, itemAction),
      () -> client.sendEvent("HOST_UPDATE_ITEM_ERROR", Response.error("Game not found"))
    ));
  }

  @OnEvent("HOST_MOVE_ITEM")
  public void onMoveItem(SocketIOClient client, ItemAction action) {
    userManager.findConnectedHost(client).ifPresent(host ->
      hostActionController.loadGame(host.getGameId()).ifPresentOrElse(
      game -> hostActionController.moveItem(game, action),
      () -> client.sendEvent("HOST_MOVE_ITEM_ERROR", Response.error("Game not found"))
      )
    );
  }

  @OnEvent("HOST_ITEM_CHANGE_VISIBILITY")
  public void onItemChangeVisibility(SocketIOClient client, ItemAction action) {
    userManager.findConnectedHost(client).ifPresent(host ->
      hostActionController.loadGame(host.getGameId()).ifPresentOrElse(
      game -> hostActionController.changeItemVisibility(game, action),
      () -> client.sendEvent("HOST_ITEM_VISIBILITY_ERROR", Response.error("Game not found"))
      )
    );
  }

  @OnEvent("HOST_USE_ITEM")
  public void onUseItem(SocketIOClient client, ItemAction action) {
    userManager.findConnectedHost(client).ifPresent(host ->
      hostActionController.loadGame(host.getGameId()).ifPresentOrElse(
        game -> hostActionController.useItem(game, action),
        () -> client.sendEvent("HOST_USE_ITEM_ERROR", Response.error("Game not found"))
      )
    );
  }
}
