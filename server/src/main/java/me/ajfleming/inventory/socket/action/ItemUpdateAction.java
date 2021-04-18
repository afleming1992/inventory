package me.ajfleming.inventory.socket.action;

import lombok.Data;
import me.ajfleming.inventory.model.Item;

@Data
public class ItemUpdateAction {
  private long roleId;
  private Item item;
}
