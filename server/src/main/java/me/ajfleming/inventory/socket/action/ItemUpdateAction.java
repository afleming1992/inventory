package me.ajfleming.inventory.socket.action;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.ajfleming.inventory.model.Item;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemUpdateAction {
  private long roleId;
  private Item item;
}
