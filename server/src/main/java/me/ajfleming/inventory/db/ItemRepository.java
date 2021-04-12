package me.ajfleming.inventory.db;

import me.ajfleming.inventory.model.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Long> {

}
