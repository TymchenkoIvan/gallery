package com.gallery.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gallery.entities.Photo;
import com.gallery.repositories.PhotoRepository;
import com.gallery.services.FileLocationService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/photos")
public class PhotoController {

    private PhotoRepository photoRepository;

    @Autowired
    private FileLocationService fileLocationService;

    public PhotoController(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    @GetMapping()
    public List<Photo> getPhotos() {
        return photoRepository.findByOrderByIdDesc();
    }

    @GetMapping("/{photoId}")
    public Photo getPhoto(@PathVariable Long photoId) {
        return photoRepository.findById(photoId).orElseThrow(RuntimeException::new);
    }

    @GetMapping(value = "/{photoId}/content", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadImage(@PathVariable Long photoId) {
        return fileLocationService.findPhoto(photoId);
    }

    @GetMapping(value = "/{photoId}/thumbnail", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadThumbnail(@PathVariable Long photoId) {
        return fileLocationService.findThumbnail(photoId);
    }

    @PostMapping
    void uploadImage(@RequestParam("file") MultipartFile multipartImage) throws Exception {
        fileLocationService.save(multipartImage.getBytes(), multipartImage.getOriginalFilename());
    }
}
