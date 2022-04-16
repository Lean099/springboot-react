package com.leandro.backend.repository;

import com.leandro.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Modifying
    @Query("update User u set u.name = :name where u.id = :id")
    void updateName(@Param(value = "id") String id,
                    @Param(value = "name") String name);

    @Modifying
    @Query("update User u set u.age = :age where u.id = :id")
    void updateAge(@Param(value = "id") String id,
                   @Param(value = "age") int age);

    @Modifying
    @Query("update User u set u.email = :email where u.id = :id")
    void updateEmail(@Param(value = "id") String id,
                     @Param(value = "email") String email);

    @Modifying
    @Query("update User u set u.password = :password where u.id = :id")
    void updatePassword(@Param(value = "id") String id,
                        @Param(value = "password") String password);
}
