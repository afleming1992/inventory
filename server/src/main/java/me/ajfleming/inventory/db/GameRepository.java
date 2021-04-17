package me.ajfleming.inventory.db;

import java.util.Optional;
import me.ajfleming.inventory.model.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Long> {
  Optional<Game> findByHostKey(String hostKey);
}
