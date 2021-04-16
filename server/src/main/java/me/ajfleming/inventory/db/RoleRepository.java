package me.ajfleming.inventory.db;

import me.ajfleming.inventory.model.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {

}
