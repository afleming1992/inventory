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
public class Game {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String hostGameKey;
  @OneToMany
  private List<Player> characters;
}
