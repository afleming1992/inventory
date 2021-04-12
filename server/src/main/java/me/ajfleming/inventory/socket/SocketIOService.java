package me.ajfleming.inventory.socket;

import com.corundumstudio.socketio.SocketIOServer;
import java.util.List;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import me.ajfleming.inventory.socket.listeners.RequestListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SocketIOService implements ApplicationListener<ContextClosedEvent> {
  private final SocketIOServer server;
  private final List<RequestListener> requestListeners;

  @PostConstruct
  public void init() { this.start(); }

  @Override
  public void onApplicationEvent(ContextClosedEvent contextClosedEvent) {
    this.shutdown();
  }

  public void setupListeners() {
    for(RequestListener listener : requestListeners) {
      server.addListeners(listener);
    }
  }

  public void start() {
    this.setupListeners();
    server.start();
  }

  public void shutdown() {
    server.stop();
  }
}
