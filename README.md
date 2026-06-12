# Crowne Plaza Amman — Hotel Issue Tracker
### Developed by Mohammad Al-Jammal · IHG Hotels & Resorts

---

## SYSTEM OVERVIEW

A real-time hotel issue tracking web app replacing the WhatsApp group chaos.
Management reports issues with photos and stamps. Departments see only their
assigned issues, update statuses, upload resolution photos, and write notes.
Everything is live — no refresh needed.

---

## FILES TO UPLOAD TO GITHUB

```
/
├── login.html          ← Entry point for all users
├── management.html     ← Management dashboard
├── department.html     ← Department dashboard
├── cp_logo.png         ← Crowne Plaza logo
├── firebase-config.js  ← Shared Firebase config
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline support)
└── icons/
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

---

## DEFAULT LOGIN CREDENTIALS

### Management
| Username   | Password      | Access            |
|------------|---------------|-------------------|
| management | cp.mgmt2024   | Full management   |

### Departments
| Username    | Password  | Department        |
|-------------|-----------|-------------------|
| engineering | eng2024   | Engineering       |
| housekeeping| hk2024    | Housekeeping      |
| frontoffice | fo2024    | Front Office      |
| fnb         | fnb2024   | Food & Beverage   |
| security    | sec2024   | Security          |

> ⚠️  CHANGE ALL PASSWORDS AFTER FIRST LOGIN
> Passwords are stored in Firebase under: cpissues/users/{username}/password
> Management can update them directly in Firebase Console.

---

## FIREBASE STRUCTURE

```
cpissues/
├── users/
│   ├── management/    { password, role: "management", nameEn, nameAr }
│   ├── engineering/   { password, role: "department", dept: "Engineering", nameEn, nameAr }
│   └── ...
└── issues/
    └── {auto-id}/
        ├── title
        ├── location
        ├── priority          (high / medium / low)
        ├── status            (open / in-progress / resolved / not-fixable)
        ├── comment
        ├── etaFrom
        ├── etaTo
        ├── assignedDepts     [ "Engineering", "Housekeeping", ... ]
        ├── photoURL          (Firebase Storage URL)
        ├── storageRef        (path in Firebase Storage)
        ├── resolutionPhotoURL
        ├── deptNote
        ├── mgmtNote
        ├── reportedBy
        ├── updatedBy
        ├── createdAt         (ISO timestamp)
        └── updatedAt         (ISO timestamp)
```

---

## FIREBASE STORAGE SETUP (REQUIRED FOR PHOTO UPLOADS)

Photos are uploaded to Firebase Storage. You need to set the Storage Rules:

1. Go to Firebase Console → Storage → Rules
2. Replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cpissues/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click Publish.

Also set Realtime Database Rules:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

---

## DEPLOYMENT — GITHUB + FIREBASE HOSTING

### Step 1 — Create new GitHub repo
  Name it: cp-issue-tracker (or any name)

### Step 2 — Upload all files
  Upload all files above maintaining the folder structure.
  For the icons/ folder: create icons/placeholder.txt first,
  then upload all PNGs into it.

### Step 3 — Firebase Hosting
  Option A — Connect GitHub to Firebase (auto-deploy on push):
    Firebase Console → Hosting → Connect to GitHub

  Option B — Manual deploy via terminal:
    firebase deploy --only hosting

### Step 4 — Set Storage & DB Rules (see above)

### Step 5 — Share the URL
  Your URL will be: https://your-project.web.app/login.html

---

## HOW IT WORKS

### Management Flow
1. Open login.html → sign in as management
2. Click "+ Add Issue"
3. Fill: title, location, priority, ETA (optional), comment (optional)
4. Assign to one or more departments
5. Upload a photo (optional but recommended)
6. Save → all assigned departments see it instantly

### Department Flow
1. Open login.html → sign in with department credentials
2. See only issues assigned to your department
3. Click "Update" on any issue
4. Choose: In Progress / Resolved / Not Fixable
5. Add a note explaining the situation
6. Upload a resolution photo if resolved
7. Save → management sees the update instantly

### Features
- ✅ Real-time sync (Firebase Realtime Database)
- ✅ Photo upload with location + date stamp on thumbnail
- ✅ Download button on every photo
- ✅ Click any photo to enlarge (lightbox)
- ✅ Priority levels (High / Medium / Low) with color coding
- ✅ ETA date range management sets for departments
- ✅ Status tracking: Open → In Progress → Resolved / Not Fixable
- ✅ Resolution photos from departments
- ✅ Department notes visible to management
- ✅ Management notes visible to departments
- ✅ Full Arabic / English bilingual support (RTL)
- ✅ Live search and multi-filter (status, department, priority)
- ✅ Stats dashboard with live counts
- ✅ PWA — installable as app on any phone
- ✅ Works on all devices (mobile, tablet, desktop)

---

## ADDING MORE DEPARTMENTS OR USERS

Go to Firebase Console → Realtime Database → cpissues → users
Add a new entry:

```json
"maintenance": {
  "password": "maint2024",
  "role": "department",
  "dept": "Maintenance",
  "nameEn": "Maintenance",
  "nameAr": "الصيانة"
}
```

Then add "Maintenance" to the department dropdowns in management.html.

---

## CREDITS

Developed by:   Mohammad Al-Jammal
Property:       Crowne Plaza Amman
Brand:          IHG Hotels & Resorts
Version:        1.0
Year:           2025
