import SongPage from "@/Components/SongPage"

export default function Home({
    params,
}: {
    params: { segment: string[] };
}) {
    return (
        <div>
            <SongPage params={{ segment: params.segment }} />
        </div>
    );

}