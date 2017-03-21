package com.lyra.delivery.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "roadmap_pattern")
    private String roadmapPattern;

    @Column(name = "ticket_delivery")
    private String ticketDelivery;

    @OneToMany(mappedBy = "application")
    @JsonIgnore
    private Set<Version> versions = new HashSet<>();

    @OneToMany(mappedBy = "application")
    @JsonIgnore
    private Set<TestYourApp> testYourApps = new HashSet<>();

    @OneToMany(mappedBy = "application")
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

    public Application name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoadmapPattern() {
        return roadmapPattern;
    }

    public Application roadmapPattern(String roadmapPattern) {
        this.roadmapPattern = roadmapPattern;
        return this;
    }

    public void setRoadmapPattern(String roadmapPattern) {
        this.roadmapPattern = roadmapPattern;
    }

    public String getTicketDelivery() {
        return ticketDelivery;
    }

    public Application ticketDelivery(String ticketDelivery) {
        this.ticketDelivery = ticketDelivery;
        return this;
    }

    public void setTicketDelivery(String ticketDelivery) {
        this.ticketDelivery = ticketDelivery;
    }

    public Set<Version> getVersions() {
        return versions;
    }

    public Application versions(Set<Version> versions) {
        this.versions = versions;
        return this;
    }

    public Application addVersion(Version version) {
        this.versions.add(version);
        version.setApplication(this);
        return this;
    }

    public Application removeVersion(Version version) {
        this.versions.remove(version);
        version.setApplication(null);
        return this;
    }

    public void setVersions(Set<Version> versions) {
        this.versions = versions;
    }

    public Set<TestYourApp> getTestYourApps() {
        return testYourApps;
    }

    public Application testYourApps(Set<TestYourApp> testYourApps) {
        this.testYourApps = testYourApps;
        return this;
    }

    public Application addTestYourApp(TestYourApp testYourApp) {
        this.testYourApps.add(testYourApp);
        testYourApp.setApplication(this);
        return this;
    }

    public Application removeTestYourApp(TestYourApp testYourApp) {
        this.testYourApps.remove(testYourApp);
        testYourApp.setApplication(null);
        return this;
    }

    public void setTestYourApps(Set<TestYourApp> testYourApps) {
        this.testYourApps = testYourApps;
    }

    public Set<DeployCommandLine> getDeployCommandLines() {
        return deployCommandLines;
    }

    public Application deployCommandLines(Set<DeployCommandLine> deployCommandLines) {
        this.deployCommandLines = deployCommandLines;
        return this;
    }

    public Application addDeployCommandLine(DeployCommandLine deployCommandLine) {
        this.deployCommandLines.add(deployCommandLine);
        deployCommandLine.setApplication(this);
        return this;
    }

    public Application removeDeployCommandLine(DeployCommandLine deployCommandLine) {
        this.deployCommandLines.remove(deployCommandLine);
        deployCommandLine.setApplication(null);
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
        Application application = (Application) o;
        if (application.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, application.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Application{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", roadmapPattern='" + roadmapPattern + "'" +
            ", ticketDelivery='" + ticketDelivery + "'" +
            '}';
    }
}
