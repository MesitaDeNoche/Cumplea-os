# Environment Variables Setup

## Required Environment Variables

### NEXT_PUBLIC_BIRTHDAY_CODE

**Description**: The 4-digit birthday code used for authentication.

**Format**: `DDMM` (Day-Month, 4 digits)

**Example**: 
- For July 12th: `0712`
- For December 5th: `1205`

**Setup**:

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and set your birthday code:
   ```bash
   NEXT_PUBLIC_BIRTHDAY_CODE=0712
   ```

3. **IMPORTANT**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Validation

The application will validate the birthday code format at startup:
- Must be exactly 4 digits
- Must be numeric only
- Will throw an error if missing or invalid

## Security Notes

- The `.env.local` file is gitignored and never committed
- The birthday code is used for client-side authentication only
- For production, consider additional server-side validation
- Use environment-specific files (`.env.production`, `.env.development`)

## Troubleshooting

### Error: "NEXT_PUBLIC_BIRTHDAY_CODE is not defined"
- Make sure `.env.local` exists in the `apps/frontend/` directory
- Verify the variable name is spelled correctly
- Restart the dev server after creating/updating `.env.local`

### Error: "must be exactly 4 digits"
- Check that the code is in DDMM format
- Remove any spaces or special characters
- Ensure it's numeric only (0-9)

## Example Configuration

```bash
# .env.local
NEXT_PUBLIC_BIRTHDAY_CODE=0712
```

This will allow authentication with the code `0712` (July 12th).
