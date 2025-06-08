import { CarouselSpacing } from "@/components/carousel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const games = [
  {
    id: "1",
    name: "Jogo 1",
    producer: "Produzido por 1",
    genre: "Ação",
    rating: "4.5",
  },
  {
    id: "2",
    name: "Jogo 2",
    producer: "Produzido por 2",
    genre: "Ação",
    rating: "4.2",
  },
  {
    id: "3",
    name: "Jogo 3",
    producer: "Produzido por 3",
    genre: "Ação",
    rating: "4.8",
  },
  {
    id: "4",
    name: "Jogo 4",
    producer: "Produzido por 4",
    genre: "Ação",
    rating: "4.1",
  },
  {
    id: "5",
    name: "Jogo 5",
    producer: "Produzido por 5",
    genre: "Ação",
    rating: "4.3",
  },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-8 pt-4">
      <h1 className="text-2xl font-semibold">Melhores avaliados</h1>

      <div className="w-full px-12">
        <CarouselSpacing />
      </div>

      <h1 className="text-2xl font-semibold">Lista de jogos</h1>

      <Table>
        <TableCaption>Clique aqui para ver todos os jogos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Jogo</TableHead>
            <TableHead>Produtora</TableHead>
            <TableHead className="text-right">Média de avaliação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">{game.id}</TableCell>
              <TableCell>{game.name}</TableCell>
              <TableCell>{game.producer}</TableCell>
              <TableCell className="text-right">{game.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
