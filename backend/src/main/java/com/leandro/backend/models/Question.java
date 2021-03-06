package com.leandro.backend.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "questions")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Question {

    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "CHAR(36)")
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name = "id_user_question")
    private User idUserQuestion;
    private String username;
    private String content;
    private Date date;
    private String idAnswer;
    @OneToOne(mappedBy = "idQuestion")
    private Answer answer;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdUserQuestion() {
        return idUserQuestion.getId();
    }

    public void setIdUserQuestion(User idUserQuestion) {
        this.idUserQuestion = idUserQuestion;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getIdAnswer(){
        return idAnswer;
    }

    public void setIdAnswer(Answer answer){
        if(answer == null){
            this.idAnswer = null;
        }else{
            this.idAnswer = answer.getId();
        }
    }

    public Answer getAnswer(){
        return answer;
    }

    public void setAnswer(Answer answer){
        this.answer = answer;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }
}
