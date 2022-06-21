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
    @Query("update User u set u.username = :username where u.id = :id")
    void updateUsername(@Param(value = "id") String id,
                        @Param(value = "username") String username);

    @Modifying
    @Query("update User u set u.dob = :dob where u.id = :id")
    void updateDob(@Param(value = "id") String id,
                   @Param(value = "dob") java.util.Date date);

    @Modifying
    @Query("update User u set u.email = :email where u.id = :id")
    void updateEmail(@Param(value = "id") String id,
                     @Param(value = "email") String email);

    @Modifying
    @Query("update User u set u.password = :password where u.id = :id")
    void updatePassword(@Param(value = "id") String id,
                        @Param(value = "password") String password);

    @Modifying
    @Query("update User u set u.picturePublicId = :publicId where u.id = :id")
    void updatePicturePublicId(@Param(value="id") String id,
                               @Param(value="publicId") String publicId);

    @Modifying
    @Query("update User u set u.pictureUrl = :url where u.id = :id")
    void updatePictureUrl(@Param(value="id") String id,
                          @Param(value="url") String url);

    User findByUsername(String username);

}
