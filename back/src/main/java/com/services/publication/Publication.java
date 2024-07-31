package com.services.publication;

import com.services.appUser.AppUser;
import com.services.enums.PublicationStatus;
import com.services.publicationApplication.PublicationApplication;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Publication {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "publication_g")
    @SequenceGenerator(name = "publication_g", sequenceName = "publication_seq", allocationSize = 1)
    private Long id;

    private String name;
    private float price;
    @Column(length = 1000)
    private String img = "/img/no_img.png";
    @Column(length = 5000)
    private String description;
    @Column(length = 5000)
    private String note = "";
    @Enumerated(EnumType.STRING)
    private PublicationStatus status = PublicationStatus.WAITING;

    @ManyToOne
    private AppUser owner;

    @OneToMany(mappedBy = "publication", cascade = CascadeType.ALL)
    private List<PublicationApplication> applications = new ArrayList<>();

    public Publication(String name, float price, String description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public void set(Publication newPublication) {
        this.name = newPublication.getName();
        this.price = newPublication.getPrice();
        this.description = newPublication.getDescription();
    }
}
