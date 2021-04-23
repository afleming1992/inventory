package me.ajfleming.inventory.socket.listeners;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.annotation.OnEvent;
import lombok.RequiredArgsConstructor;
import me.ajfleming.inventory.controllers.PlayerActionController;
import me.ajfleming.inventory.db.GameRepository;
import me.ajfleming.inventory.socket.action.LoginAction;
import me.ajfleming.inventory.socket.response.Response;
import me.ajfleming.inventory.user.UserManager;
import me.ajfleming.inventory.socket.action.ItemAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PlayerEventListeners extends RequestListener {
  private final GameRepository gameRepository;
  private final PlayerActionController playerActionController;
  private final UserManager userManager;

  @OnEvent("LOGIN")
  public void onLoginToGame(SocketIOClient client, LoginAction login) {
    gameRepository.findById(login.getGameId()).ifPresent(game ->
      playerActionController.loadRole(game, login.getJoinCode()).ifPresentOrElse(role -> {
      userManager.connectPlayer(login.getGameId(), role.getId(), client);
      playerActionController.setupPlayerOnLogin(client, game, role);
      client.sendEvent("LOGIN_SUCCESS", Response.success("You have joined the game!"));
    }, () -> {
      client.sendEvent("LOGIN_ERROR", Response.error("Join Code is not valid!"));
    }));
  }

  @OnEvent("SHOW_ITEM")
  public void onShowItem(SocketIOClient client, ItemAction itemAction) {
    userManager.findConnectedUser(client).ifPresent(
        user -> gameRepository.findById(user.getGameId())
        .ifPresent(game -> playerActionController.showItem(game, user.getRoleId(), itemAction)));
  }

  @OnEvent("GIVE_ITEM")
  public void onGiveItem(SocketIOClient client, ItemAction itemAction) {
    userManager.findConnectedUser(client).ifPresent(
        user -> gameRepository.findById(user.getGameId())
        .ifPresent(game -> playerActionController.giveItem(game, user.getRoleId(), itemAction))
    );
  }
}
