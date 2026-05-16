type PageSeoInput = {
  title: string
  description: string
  image?: string
}

export const usePageSeo = () => {
  const config = useRuntimeConfig()

  const setPageSeo = ({ title, description, image }: PageSeoInput) => {
    useSeoMeta({
      title,
      ogTitle: title,
      twitterTitle: title,
      description,
      ogDescription: description,
      twitterDescription: description,
      ogImage: image,
      twitterImage: image,
      twitterCard: image ? 'summary_large_image' : 'summary',
      ogSiteName: config.public.siteName
    })
  }

  return {
    setPageSeo
  }
}
