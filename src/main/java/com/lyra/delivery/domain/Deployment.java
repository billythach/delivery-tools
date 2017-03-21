package com.lyra.delivery.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Deployment.
 */
@Entity
@Table(name = "deployment")
public class Deployment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private ZonedDateTime date;

    @OneToMany(mappedBy = "deployment")
    @JsonIgnore
    private Set<Issue> issues = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "deployment_delivery_dev",
               joinColumns = @JoinColumn(name="deployments_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="delivery_devs_id", referencedColumnName="id"))
    private Set<UserDelivery> deliveryDevs = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "deployment_delivery_exploitation",
               joinColumns = @JoinColumn(name="deployments_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="delivery_exploitations_id", referencedColumnName="id"))
    private Set<UserDelivery> deliveryExploitations = new HashSet<>();

    @ManyToOne
    private Plateform plateform;

    @ManyToOne
    private Version version;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Deployment date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Set<Issue> getIssues() {
        return issues;
    }

    public Deployment issues(Set<Issue> issues) {
        this.issues = issues;
        return this;
    }

    public Deployment addIssue(Issue issue) {
        this.issues.add(issue);
        issue.setDeployment(this);
        return this;
    }

    public Deployment removeIssue(Issue issue) {
        this.issues.remove(issue);
        issue.setDeployment(null);
        return this;
    }

    public void setIssues(Set<Issue> issues) {
        this.issues = issues;
    }

    public Set<UserDelivery> getDeliveryDevs() {
        return deliveryDevs;
    }

    public Deployment deliveryDevs(Set<UserDelivery> userDeliveries) {
        this.deliveryDevs = userDeliveries;
        return this;
    }

    public Deployment addDeliveryDev(UserDelivery userDelivery) {
        this.deliveryDevs.add(userDelivery);
        userDelivery.getDeploymentAsDevs().add(this);
        return this;
    }

    public Deployment removeDeliveryDev(UserDelivery userDelivery) {
        this.deliveryDevs.remove(userDelivery);
        userDelivery.getDeploymentAsDevs().remove(this);
        return this;
    }

    public void setDeliveryDevs(Set<UserDelivery> userDeliveries) {
        this.deliveryDevs = userDeliveries;
    }

    public Set<UserDelivery> getDeliveryExploitations() {
        return deliveryExploitations;
    }

    public Deployment deliveryExploitations(Set<UserDelivery> userDeliveries) {
        this.deliveryExploitations = userDeliveries;
        return this;
    }

    public Deployment addDeliveryExploitation(UserDelivery userDelivery) {
        this.deliveryExploitations.add(userDelivery);
        userDelivery.getDeploymentAsExploitations().add(this);
        return this;
    }

    public Deployment removeDeliveryExploitation(UserDelivery userDelivery) {
        this.deliveryExploitations.remove(userDelivery);
        userDelivery.getDeploymentAsExploitations().remove(this);
        return this;
    }

    public void setDeliveryExploitations(Set<UserDelivery> userDeliveries) {
        this.deliveryExploitations = userDeliveries;
    }

    public Plateform getPlateform() {
        return plateform;
    }

    public Deployment plateform(Plateform plateform) {
        this.plateform = plateform;
        return this;
    }

    public void setPlateform(Plateform plateform) {
        this.plateform = plateform;
    }

    public Version getVersion() {
        return version;
    }

    public Deployment version(Version version) {
        this.version = version;
        return this;
    }

    public void setVersion(Version version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Deployment deployment = (Deployment) o;
        if (deployment.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, deployment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Deployment{" +
            "id=" + id +
            ", date='" + date + "'" +
            '}';
    }
}
