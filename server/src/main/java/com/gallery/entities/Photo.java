package com.gallery.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String photoLocation;

    private String thumbnailLocation;

    @Lob
    byte[] content;

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public Photo() {
    }

    public Photo(String name, String photoLocation, String thumbnailLocation) {
        this.name = name;
        this.photoLocation = photoLocation;
        this.thumbnailLocation = thumbnailLocation;
    }

    public long getId() {
        return id;
    }
    
    public String getPhotoLocation() {
        return photoLocation;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhotoLocation(String photoLocation) {
        this.photoLocation = photoLocation;
    }

    public void setThumbnailLocation(String thumbnailLocation) {
        this.thumbnailLocation = thumbnailLocation;
    }

    public String getThumbnailLocation() {
        return thumbnailLocation;
    }
}
