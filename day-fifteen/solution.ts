// Tests
import { Expect, Equal } from 'type-testing';

type test_doll_actual = BoxToys<'doll', 1>;
//   ^?
type test_doll_expected = ['doll'];
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>;

type test_nutcracker_actual = BoxToys<'nutcracker', 3 | 4>;
//   ^?
type test_nutcracker_expected =
  | ['nutcracker', 'nutcracker', 'nutcracker']
  | ['nutcracker', 'nutcracker', 'nutcracker', 'nutcracker'];
type test_nutcracker = Expect<Equal<test_nutcracker_expected, test_nutcracker_actual>>;


// Soliution
type ToyReplicater<Toy, Count, Replicates extends Toy[] = []> = Replicates["length"] extends Count
  ? Replicates
  : ToyReplicater<Toy, Count, [...Replicates, Toy]>;

type BoxToys<Toy, CountUnion> = CountUnion extends infer Count
	? ToyReplicater<Toy, Count, []>
	: never;
