package me.ajfleming.inventory.model;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Player {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;
  private String characterName;
  private boolean hidden;
  private String joinCode;
  @OneToMany
  private List<Item> item;
}
