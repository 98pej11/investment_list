import * as S from "components/Loading/Loading.styles";

import LoadingSpinner from "static/loading.gif";

export default function Loading() {
  return (
    <S.Background>
      <S.Spinner src={LoadingSpinner} />
    </S.Background>
  );
}
