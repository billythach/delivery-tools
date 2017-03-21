package com.lyra.delivery.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Plateform.
 */
@Entity
@Table(name = "plateform")
public class Plateform implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "plateform")
    @JsonIgnore
    private Set<Deployment> deployments = new HashSet<>();

    @OneToMany(mappedBy = "plateform")
    @JsonIgnore
    private Set<TestYourApp> testYourApps = new HashSet<>();

    @OneToMany(mappedBy = "plateform")
    @JsonIgnore
    private Set<DeployCommandLine> deployCommandLines = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Plateform name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Deployment> getDeployments() {
        return deployments;
    }

    public Plateform deployments(Set<Deployment> deployments) {
        this.deployments = deployments;
        return this;
    }

    public Plateform addDeployment(Deployment deployment) {
        this.deployments.add(deployment);
        deployment.setPlateform(this);
        return this;
    }

    public Plateform removeDeployment(Deployment deployment) {
        this.deployments.remove(deployment);
        deployment.setPlateform(null);
        return this;
    }

    public void setDeployments(Set<Deployment> deployments) {
        this.deployments = deployments;
    }

    public Set<TestYourApp> getTestYourApps() {
        return testYourApps;
    }

    public Plateform testYourApps(Set<TestYourApp> testYourApps) {
        this.testYourApps = testYourApps;
        return this;
    }

    public Plateform addTestYourApp(TestYourApp testYourApp) {
        this.testYourApps.add(testYourApp);
        testYourApp.setPlateform(this);
        return this;
    }

    public Plateform removeTestYourApp(TestYourApp testYourApp) {
        this.testYourApps.remove(testYourApp);
        testYourApp.setPlateform(null);
        return this;
    }

    public void setTestYourApps(Set<TestYourApp> testYourApps) {
        this.testYourApps = testYourApps;
    }

    public Set<DeployCommandLine> getDeployCommandLines() {
        return deployCommandLines;
    }

    public Plateform deployCommandLines(Set<DeployCommandLine> deployCommandLines) {
        this.deployCommandLines = deployCommandLines;
        return this;
    }

    public Plateform addDeployCommandLine(DeployCommandLine deployCommandLine) {
        this.deployCommandLines.add(deployCommandLine);
        deployCommandLine.setPlateform(this);
        return this;
    }

    public Plateform removeDeployCommandLine(DeployCommandLine deployCommandLine) {
        this.deployCommandLines.remove(deployCommandLine);
        deployCommandLine.setPlateform(null);
        return this;
    }

    public void setDeployCommandLines(Set<DeployCommandLine> deployCommandLines) {
        this.deployCommandLines = deployCommandLines;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Plateform plateform = (Plateform) o;
        if (plateform.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, plateform.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Plateform{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
