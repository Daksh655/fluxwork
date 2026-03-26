// we use this for login and register duplication check
package com.fluxwork.core.tenant.user.repository;

import com.fluxwork.core.tenant.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {  // this automatically gives you methods such as save(), findById(), findAll(), delete(), exists(), there is no need to write SQL

    Optional<UserEntity> findByEmail(Long email);  // this auto generates a sql query ( SELECT * from user WHERE email = ? )
}
