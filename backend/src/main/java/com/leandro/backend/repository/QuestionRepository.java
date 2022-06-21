package com.leandro.backend.repository;

import com.leandro.backend.models.Question;
import com.leandro.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {

    @Modifying
    @Query("update Question q set q.content = :content where q.id = :id")
    void updateContentQuestion(@Param(value = "id") String id, @Param(value = "content") String content);

    @Modifying
    @Query("update Question q set q.idAnswer = :idAnswer where q.id = :id")
    void updateIdAnswer(@Param(value = "id") String id, @Param(value = "idAnswer") String idAnswer);

    public List<Question> findAllByIdUserQuestion(User idUserQuestion);

    public void deleteAllByIdUserQuestion(String idUserQuestion);
}
