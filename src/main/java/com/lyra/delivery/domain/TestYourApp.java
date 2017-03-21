package com.lyra.delivery.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TestYourApp.
 */
@Entity
@Table(name = "test_your_app")
public class TestYourApp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "link")
    private String link;

    @ManyToOne
    private Application application;

    @ManyToOne
    private Plateform plateform;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public TestYourApp link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Application getApplication() {
        return application;
    }

    public TestYourApp application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Plateform getPlateform() {
        return plateform;
    }

    public TestYourApp plateform(Plateform plateform) {
        this.plateform = plateform;
        return this;
    }

    public void setPlateform(Plateform plateform) {
        this.plateform = plateform;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TestYourApp testYourApp = (TestYourApp) o;
        if (testYourApp.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, testYourApp.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "TestYourApp{" +
            "id=" + id +
            ", link='" + link + "'" +
            '}';
    }
}
