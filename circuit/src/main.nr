fn main(x: Field, y: pub Field, z: pub Field) {
    assert((x != y) & (y != z));
}

#[test]
fn test_main() {
    main(1, 2, 1);
}
