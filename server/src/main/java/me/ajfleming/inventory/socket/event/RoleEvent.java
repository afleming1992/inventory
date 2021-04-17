package me.ajfleming.inventory.socket.event;

import lombok.Data;

@Data
public class RoleEvent {
  private String name;
  private boolean hidden = true;
}
