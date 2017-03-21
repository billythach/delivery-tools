package com.lyra.delivery.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.lyra.delivery.domain.enumeration.UserDeliveryType;

/**
 * A UserDelivery.
 */
@Entity
@Table(name = "user_delivery")
public class UserDelivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private UserDeliveryType type;

    @ManyToMany(mappedBy = "deliveryDevs")
    @JsonIgnore
    private Set<Deployment> deploymentAsDevs = new HashSet<>();

    @ManyToMany(mappedBy = "deliveryExploitations")
    @JsonIgnore
    private Set<Deployment> deploymentAsExploitations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public UserDelivery name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserDeliveryType getType() {
        return type;
    }

    public UserDelivery type(UserDeliveryType type) {
        this.type = type;
        return this;
    }

    public void setType(UserDeliveryType type) {
        this.type = type;
    }

    public Set<Deployment> getDeploymentAsDevs() {
        return deploymentAsDevs;
    }

    public UserDelivery deploymentAsDevs(Set<Deployment> deployments) {
        this.deploymentAsDevs = deployments;
        return this;
    }

    public UserDelivery addDeploymentAsDev(Deployment deployment) {
        this.deploymentAsDevs.add(deployment);
        deployment.getDeliveryDevs().add(this);
        return this;
    }

    public UserDelivery removeDeploymentAsDev(Deployment deployment) {
        this.deploymentAsDevs.remove(deployment);
        deployment.getDeliveryDevs().remove(this);
        return this;
    }

    public void setDeploymentAsDevs(Set<Deployment> deployments) {
        this.deploymentAsDevs = deployments;
    }

    public Set<Deployment> getDeploymentAsExploitations() {
        return deploymentAsExploitations;
    }

    public UserDelivery deploymentAsExploitations(Set<Deployment> deployments) {
        this.deploymentAsExploitations = deployments;
        return this;
    }

    public UserDelivery addDeploymentAsExploitation(Deployment deployment) {
        this.deploymentAsExploitations.add(deployment);
        deployment.getDeliveryExploitations().add(this);
        return this;
    }

    public UserDelivery removeDeploymentAsExploitation(Deployment deployment) {
        this.deploymentAsExploitations.remove(deployment);
        deployment.getDeliveryExploitations().remove(this);
        return this;
    }

    public void setDeploymentAsExploitations(Set<Deployment> deployments) {
        this.deploymentAsExploitations = deployments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserDelivery userDelivery = (UserDelivery) o;
        if (userDelivery.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, userDelivery.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UserDelivery{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", type='" + type + "'" +
            '}';
    }
}
