# Hummingbird UI Feature Analysis

This document analyzes the current implementation status of features from `FEATURES.md` and provides an integration plan for missing features.

---

## ✅ IMPLEMENTED FEATURES (32/60)

### Image Section
| Feature | Status | Location |
|---------|--------|----------|
| Name of the container image | ✅ Implemented | `ContainerImageCard` component, modal header |
| Version | ✅ Implemented | `latestTag` property displayed on cards |
| Podman pull command | ✅ Implemented | Cards show `podman pull` command |
| Copy + pastable pull commands | ✅ Implemented | Copy button with clipboard API |
| Changeable version via tag | ✅ Implemented | Variants table in modal with tag selection |
| FIPs is on another image | ✅ Implemented | Purple "FIPS Available" badge on cards |
| License | ✅ Implemented | License column in SBOM table |

### Minimal Section
| Feature | Status | Location |
|---------|--------|----------|
| Drop-in replace instructions | ✅ Implemented | "Swap existing instance" section in modal |
| Architectures supported | ✅ Implemented | Labels (RHEL 9, amd64) + Inventory section |
| Compressed image download size | ✅ Implemented | `size` property on cards + Inventory |

### Updated Section
| Feature | Status | Location |
|---------|--------|----------|
| Tags | ✅ Implemented | Variants table in modal |
| :latest | ✅ Implemented | "Latest" label highlighting in table |
| :latest-builder | ✅ Implemented | Builder variant toggle |
| default go-latest image | ✅ Implemented | Go-tools variant toggle |
| Show that -builder will add package manager | ✅ Implemented | Builder toggle with suffix in pull command |
| Show that -builder will add Shell | ✅ Implemented | Builder toggle in variants section |
| Security feed (Advisories) | ✅ Implemented | Full Security Feed page + modal tab |

### Secure Section
| Feature | Status | Location |
|---------|--------|----------|
| Zero CVEs noted | ✅ Implemented | Vulnerability Scanning section shows "0 Critical/High/Medium" |
| List or link to supported scanners | ✅ Implemented | Syft & Grype mentioned with commands |
| View SBOM | ✅ Implemented | Packages tab with searchable/paginated SBOM table |
| CVEs ordered: Critical, high, medium, low | ✅ Implemented | Security Feed with severity labels |
| Download SPDX SBOM format | ✅ Implemented | "Download SPDX" button in Packages tab |
| $cosign instructions | ✅ Implemented | Image Verification section with public key + command |
| Total package # in SBOM | ✅ Implemented | Pagination shows total count |
| if FIPS, add clear icon & label | ✅ Implemented | Purple FIPS badge on cards |
| Manifest digest | ✅ Implemented | Shown in modal Overview tab |

### Design System
| Feature | Status | Location |
|---------|--------|----------|
| Project compass design system | ✅ Implemented | Using CompassPanel, CompassContent throughout |

---

## ❌ MISSING FEATURES (28/60)

### Image Section - Must Have (3 missing)
1. **Docker pull command** - Only podman shown currently
2. **Documentation on usage** - No docs section
3. **Request an image from us** - No request form/link
4. **Contact us/provide feedback** - No feedback mechanism

### Image Section - Nice to Have (6 missing)
5. **Shareable URLs for every tag** - No deep linking
6. **Image/repo name copy/paste** - Only full command copyable
7. **Logo of the upstream distributor** - No logos shown
8. **Hummingbird logo in search results** - No branding in search
9. **Selector to choose between docker and podman** - No toggle

### Image Section - Innovation (5 missing)
10. **Recommended images based on other users** - No personalization
11. **Sharing beyond copy + paste** - No share buttons
12. **Recently searched or used** - No history
13. **Customize this image** - No customization
14. **See a roadmap of upcoming images and upvote** - No roadmap

### Minimal Section (4 missing)
15. **Image comparison report** - No comparison tool
16. **Compatibility section** - No compatibility info
17. **AI migration commands** - No AI assistance
18. **Cross-sell Red Hat products (OpenShift)** - No cross-sell
19. **Link to git repo where container file is defined** - No repo links

### Updated Section (4 missing)
20. **Date and time of last scan** - Only SBOM generation date shown
21. **Date and time of last update** - Partial (relative time only)
22. **Single, reliable date and time of last scan** - Not consolidated
23. **Label or icon to identify "archived" or deprecated** - No deprecation indicators

### Updated Section - Innovation (3 missing)
24. **Trained on our documentation** - No AI
25. **Chat-driven advisory search** - No chat
26. **Intelligent advisory/catalog search** - Basic search only

### Secure Section (5 missing)
27. **Link to official CVE repository** - CVE IDs not linked to NVD
28. **FIPS & STIG accurately represented** - STIG not shown
29. **Total CVE # per image** - Not shown on cards
30. **Multiple attestation types** - Only cosign shown
31. **Advisories (CVE resolution history)** - No history view
32. **Common errors you may run into** - No error guidance

### Secure Section - Innovation (1 missing)
33. **Guidelines for swapping this image via AI** - No AI guidance

### Onboarding Section (2 missing)
34. **Show a list of blog posts** - No blog section
35. **Include the FAQ** - No FAQ

---

## 📋 INTEGRATION PLAN

### Phase 1: Quick Wins (1-2 days each)

#### 1. Docker Pull Command
**File:** `src/app/Dashboard/Dashboard.tsx`
**Plan:** Add a toggle or show both commands
```tsx
// In ContainerImageCard and modal, add:
<ToggleGroup>
  <ToggleGroupItem text="podman" isSelected={cmdType === 'podman'} />
  <ToggleGroupItem text="docker" isSelected={cmdType === 'docker'} />
</ToggleGroup>
// Then dynamically switch: `${cmdType} pull registry...`
```

#### 2. Link CVE IDs to NVD
**File:** `src/app/SecurityFeed/SecurityFeed.tsx`
**Plan:** Make CVE IDs external links
```tsx
<Button 
  variant="link" 
  component="a"
  href={`https://nvd.nist.gov/vuln/detail/${row.cveId}`}
  target="_blank"
  icon={<ExternalLinkAltIcon />}
>
  {row.cveId}
</Button>
```

#### 3. Contact Us / Feedback
**File:** `src/app/AppLayout/AppLayout.tsx` or new component
**Plan:** Add feedback link to masthead
```tsx
<Button 
  variant="link" 
  component="a" 
  href="mailto:hummingbird-feedback@redhat.com"
>
  Provide Feedback
</Button>
```

#### 4. Request an Image
**File:** `src/app/Dashboard/Dashboard.tsx`
**Plan:** Add a card or button linking to Jira/form
```tsx
<Card>
  <CardTitle>Can't find what you need?</CardTitle>
  <CardBody>
    <Button component="a" href="https://issues.redhat.com/..." target="_blank">
      Request an Image
    </Button>
  </CardBody>
</Card>
```

#### 5. Total CVE Count on Cards
**File:** `src/app/Dashboard/Dashboard.tsx`
**Plan:** Display `cveCount` property (already in interface)
```tsx
// In ContainerImageCard footer:
{image.cveCount === 0 ? (
  <Label color="green" icon={<CheckCircleIcon />}>0 CVEs</Label>
) : (
  <Label color="red">{image.cveCount} CVEs</Label>
)}
```

#### 6. Documentation on Usage
**File:** `src/app/Dashboard/Dashboard.tsx`
**Plan:** Add link to external docs in modal
```tsx
// In modal header or Overview tab:
<Button 
  variant="link" 
  component="a" 
  href={`https://quay.io/repository/hummingbird/${selectedImage.name.toLowerCase()}`}
  target="_blank"
  icon={<ExternalLinkAltIcon />}
>
  View Documentation
</Button>
```

### Phase 2: Medium Effort (3-5 days each)

#### 7. Shareable URLs for Tags
**Files:** `src/app/routes.tsx`, `src/app/Dashboard/Dashboard.tsx`
**Plan:** 
- Add route parameter: `/image/:imageName/:tag`
- Use `useParams` to pre-select image/tag on load
- Add "Share" button that copies URL

#### 8. Date/Time of Last Scan & Update
**File:** `src/app/Dashboard/Dashboard.tsx`
**Plan:**
- Add `lastScanned` and `lastUpdated` to `ContainerImage` interface
- Display in modal header with absolute timestamps
```tsx
<Content>Last scanned: {formatDate(selectedImage.lastScanned)}</Content>
<Content>Last updated: {formatDate(selectedImage.lastUpdated)}</Content>
```

#### 9. Archived/Deprecated Labels
**File:** `src/app/Dashboard/Dashboard.tsx`
**Plan:**
- Add `isDeprecated` to `ImageVariant` interface
- Show warning label in variants table
```tsx
{variant.isDeprecated && (
  <Label color="orange" icon={<ExclamationTriangleIcon />}>Deprecated</Label>
)}
```

#### 10. STIG Compliance Indicator
**File:** `src/app/Dashboard/Dashboard.tsx`
**Plan:** Add STIG badge alongside FIPS
```tsx
{image.isStigCompliant && (
  <Label color="green" icon={<CheckCircleIcon />}>STIG</Label>
)}
```

#### 11. Link to Git Repo
**File:** `src/app/Dashboard/Dashboard.tsx`
**Plan:** Add link in Containerfile tab
```tsx
// In Containerfile tab:
<Button 
  variant="link"
  component="a"
  href={`https://gitlab.com/redhat/hummingbird/containers/-/tree/main/images/${selectedImage.name.toLowerCase()}`}
  target="_blank"
>
  View Source on GitLab
</Button>
```

### Phase 3: Larger Features (1-2 weeks each)

#### 12. Image Comparison Report
**Plan:** 
- Create new route `/compare`
- Allow selecting 2 images side-by-side
- Show diff of packages, size, CVEs, architectures

#### 13. FAQ Section
**Plan:**
- Create `src/app/FAQ/FAQ.tsx`
- Add to routes
- Use PatternFly Accordion component

#### 14. Blog Posts Section
**Plan:**
- Create `src/app/Blog/Blog.tsx`
- Fetch from RSS feed or static data
- Display in card grid format

#### 15. Recently Used Images
**Plan:**
- Store in localStorage
- Show "Recent" section on Overview
- Limit to last 5 images

### Phase 4: Innovation (Future Sprints)

#### 16. AI-Powered Features
- Migrate commands
- Chat-driven search
- Image recommendations

#### 17. Personalization
- User accounts
- Favorites syncing
- Usage analytics

---

## 📊 SUMMARY

| Category | Implemented | Missing | Completion |
|----------|-------------|---------|------------|
| Image - Must Have | 4/8 | 4 | 50% |
| Image - Nice to Have | 3/8 | 5 | 37.5% |
| Image - Innovation | 0/5 | 5 | 0% |
| Minimal - Must Have | 3/3 | 0 | 100% |
| Minimal - Nice to Have | 1/5 | 4 | 20% |
| Updated - Must Have | 7/9 | 2 | 78% |
| Updated - Nice to Have | 0/2 | 2 | 0% |
| Updated - Innovation | 1/4 | 3 | 25% |
| Secure - Must Have | 9/10 | 1 | 90% |
| Secure - Nice to Have | 1/5 | 4 | 20% |
| Secure - Innovation | 0/1 | 1 | 0% |
| Onboarding | 0/2 | 2 | 0% |
| **TOTAL** | **32/60** | **28** | **53%** |

### Recommended Priority Order:
1. **Docker pull command** (Must Have, easy)
2. **Contact us/feedback** (Must Have, easy)
3. **Request an image** (Must Have, easy)
4. **Link CVEs to NVD** (Must Have, easy)
5. **Documentation links** (Must Have, easy)
6. **Total CVE count on cards** (Nice to Have, easy)
7. **Shareable URLs** (Nice to Have, medium)
8. **Date/time timestamps** (Must Have, medium)
9. **FAQ section** (Nice to Have, medium)
10. **Image comparison** (Must Have, larger)
