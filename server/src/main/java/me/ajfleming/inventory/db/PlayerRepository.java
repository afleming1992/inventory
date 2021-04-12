package me.ajfleming.inventory.db;

import me.ajfleming.inventory.model.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Long> {

}
