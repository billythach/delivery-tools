package com.lyra.delivery.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Version.
 */
@Entity
@Table(name = "version")
public class Version implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number")
    private String number;

    @ManyToOne
    private Application application;

    @OneToMany(mappedBy = "version")
    @JsonIgnore
    private Set<Deployment> deployments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public Version number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Application getApplication() {
        return application;
    }

    public Version application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Set<Deployment> getDeployments() {
        return deployments;
    }

    public Version deployments(Set<Deployment> deployments) {
        this.deployments = deployments;
        return this;
    }

    public Version addDeployment(Deployment deployment) {
        this.deployments.add(deployment);
        deployment.setVersion(this);
        return this;
    }

    public Version removeDeployment(Deployment deployment) {
        this.deployments.remove(deployment);
        deployment.setVersion(null);
        return this;
    }

    public void setDeployments(Set<Deployment> deployments) {
        this.deployments = deployments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Version version = (Version) o;
        if (version.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, version.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Version{" +
            "id=" + id +
            ", number='" + number + "'" +
            '}';
    }
}
