package com.leandro.backend.repository;

import com.leandro.backend.models.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PictureRepository extends JpaRepository<Picture, String>{

    public Optional<Picture> findByPublicId(String publicId);

}
