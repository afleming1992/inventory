package me.ajfleming.inventory.user;

import com.corundumstudio.socketio.SocketIOClient;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class UserManager {
  Map<String, Player> connectedUsers;
  Map<String, Host> connectedHosts;

  public UserManager() {
    connectedUsers = new HashMap<>();
    connectedHosts = new HashMap<>();
  }

  public Player connectPlayer(long gameId, long playerId, SocketIOClient client) {
    Player user = new Player(client, gameId, playerId);
    connectedUsers.put(sessionId(client), user);
    return user;
  }

  public Host connectHost(SocketIOClient client, long gameId) {
    Host host = new Host(client, gameId);
    connectedHosts.put(sessionId(client), host);
    return host;
  }

  public void disconnectUser(SocketIOClient client) {
    connectedUsers.remove(sessionId(client));
    connectedHosts.remove(sessionId(client));
  }

  public Optional<Player> findConnectedUser(SocketIOClient client) {
    return Optional.ofNullable(connectedUsers.get(sessionId(client)));
  }

  public Optional<Host> findConnectedHost(SocketIOClient client) {
    return Optional.ofNullable(connectedHosts.get(sessionId(client)));
  }

  private String sessionId(SocketIOClient client) {
    return client.getSessionId().toString();
  }
}
