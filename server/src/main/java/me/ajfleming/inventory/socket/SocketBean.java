package me.ajfleming.inventory.socket;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketConfig;
import com.corundumstudio.socketio.SocketIOServer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SocketBean {
  @Value("${SOCKET_PORT}")
  private String socketIoPort;

  @Bean
  public Configuration socketIoConfig() {
    Configuration config = new Configuration();
    config.setPort(Integer.parseInt(socketIoPort));

    SocketConfig socketConfig = new SocketConfig();
    socketConfig.setReuseAddress(true);
    config.setSocketConfig(socketConfig);

    return config;
  }

  @Bean
  public SocketIOServer server(Configuration configuration) {
    return new SocketIOServer(configuration);
  }
}
