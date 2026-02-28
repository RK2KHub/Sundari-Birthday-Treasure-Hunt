# Sundari • React Netflix-Style Treasure Hunt (Path-Fixed)

## Why images weren’t rendering
If you run your app under a sub-path (or your base URL isn't `/`), absolute paths like `/assets/...` can fail.
This version builds image URLs using `import.meta.env.BASE_URL`, so paths work reliably.

## How to run
```bash
npm install
npm run dev
```

## Where to put images (4 per treasure page)
Place images here (inside `public/`):

```
public/assets/treasures/t1/1.(jpg/JPG/png/webp)
public/assets/treasures/t1/2.(...)
public/assets/treasures/t1/3.(...)
public/assets/treasures/t1/4.(...)

public/assets/treasures/t2/1..4
...
public/assets/treasures/t8/1..4
```

## Quick test
After `npm run dev`, open:
- `http://localhost:5173/assets/treasures/t1/1.jpg`
OR if your file is uppercase:
- `http://localhost:5173/assets/treasures/t1/1.JPG`

If you still see nothing, check the **file size** isn’t 0 KB and the names are exactly `1..4`.


## Poem behavior
Poem is hidden/greyed out until the correct answer is unlocked.


## Final Treasure page (wedding card + countdown)
After you unlock Treasure 8 and press **Next**, you’ll go to:
- `/final`

Put these files here:
- `public/assets/couple/left.jpg`
- `public/assets/couple/right.jpg`
- `public/assets/doodles/chettinad-invite.svg`  (already included)


## Birthday FX
Floating balloons + sparkles are enabled on every page. Tap/click to create a small pop burst.
