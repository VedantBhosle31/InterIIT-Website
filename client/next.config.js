/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MAX_HIGH_PREP_PARTICIPANTS : process.env.NEXT_PUBLIC_MAX_HIGH_PREP_PARTICIPANTS,
        MAX_MID_PREP_PARTICIPANTS : process.env.NEXT_PUBLIC_MAX_MID_PREP_PARTICIPANTS,
        MAX_LOW_PREP_PARTICIPANTS : process.env.NEXT_PUBLIC_MAX_LOW_PREP_PARTICIPANTS,
        MAX_NO_PREP_PARTICIPANTS : process.env.NEXT_PUBLIC_MAX_NO_PREP_PARTICIPANTS,
        MAX_SAC_EC_PARTICIPANTS : process.env.NEXT_PUBLIC_MAX_SAC_EC_PARTICIPANTS,
        API_URL : process.env.NEXT_PUBLIC_API_URL,
        TECHMEET_AWS_ACCESS_KEY : process.env.TECHMEET_AWS_ACCESS_KEY,
        TECHMEET_AWS_SECRET_KEY : process.env.TECHMEET_AWS_SECRET_KEY,
        TECHMEET_AWS_REGION : process.env.TECHMEET_AWS_REGION,
        TECHMEET_AWS_BUCKET_NAME : process.env.TECHMEET_AWS_BUCKET_NAME,
    }
}

module.exports = nextConfig
