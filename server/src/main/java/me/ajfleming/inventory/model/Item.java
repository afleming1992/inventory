package me.ajfleming.inventory.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Item {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;
  private String name;
  private String imageUrl;
  private String description;
  private Integer maxUsages;
  private Integer usagesleft;
  private boolean swapable = true;
  private boolean hidden = true;
}
