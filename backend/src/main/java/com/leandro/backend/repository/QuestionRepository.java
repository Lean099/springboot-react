package com.leandro.backend.repository;

import com.leandro.backend.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {
    @Modifying
    @Query("update Question q set q.content = :content where q.id = :id")
    void updateContentQuestion(@Param(value = "id") String id, @Param(value = "content") String content);
}
