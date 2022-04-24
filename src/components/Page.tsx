interface PageProps {
    page: number,
    data: Object
}

function Page(props: PageProps) {
    return (
        <div>{props.page}</div>
    );
}

export default Page;