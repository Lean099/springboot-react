package com.leandro.backend.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "users")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class User {

    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "CHAR(36)")
    @Id
    private String id;
    private String username;
    private Date dob;
    private String email;
    private String password;
    private String picturePublicId;
    private String pictureUrl;

    @OneToMany(mappedBy = "idUserQuestion")
    private List<Question> questionsList;

    @OneToMany(mappedBy = "idUserAnswer")
    private List<Answer> answersList;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPicturePublicId() {
        return picturePublicId;
    }

    public void setPicturePublicId(String picturePublicId) {
        this.picturePublicId = picturePublicId;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public List<Question> getQuestionsList(){
        return questionsList;
    }

    public void setQuestionsList(List<Question> questionsList){
        this.questionsList = questionsList;
    }

    public List<Answer> getAnswersList(){
        return answersList;
    }

    public void setAnswersList(List<Answer> answersList){
        this.answersList = answersList;
    }

}
