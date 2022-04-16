package com.leandro.backend.repository;

import com.leandro.backend.models.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepository extends JpaRepository<Response, String> {
    @Modifying
    @Query("update Response r set r.content = :content where r.id = :id")
    void updateContentResponse(@Param(value = "id") String id, @Param(value = "content") String content);
}
