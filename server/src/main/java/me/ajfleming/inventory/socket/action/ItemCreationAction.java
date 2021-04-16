package me.ajfleming.inventory.socket.action;

import lombok.Data;

@Data
public class ItemCreationAction {
  private long roleId;
  private String name;
  private String imageUrl;
  private String description;
}
