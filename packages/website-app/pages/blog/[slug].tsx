import { getPostBySlug, getAllPosts, Release } from '@geislabs/website-content'
import { Sidebar } from '@geislabs/website-layout'
import { BlogPost, Detail } from '@geislabs/website-blog'
import React from 'react'
import { ContentHeader } from 'layouts/common'
import { useSubscribe } from 'hooks'

export interface BlogPostPageProps {
    content: string
    post: BlogPost
    releases: Release[]
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
    post,
    releases,
    content,
}) => {
    const subscribe = useSubscribe()
    return (
        <Detail.Layout
            post={post}
            header={<ContentHeader />}
            right={<Sidebar releases={releases} />}
            subscribe={<Detail.Subscribe onSubmit={subscribe.onSubmit} />}
        >
            <Detail.Page
                description={post.summary}
                post={post}
                content={content}
            />
        </Detail.Layout>
    )
}

export async function getStaticProps(context) {
    return {
        props: await getPostBySlug(context.params.slug),
    }
}

export async function getStaticPaths() {
    const posts = await getAllPosts()
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))
    return {
        paths: paths,
        fallback: false,
    }
}

export default BlogPostPage
