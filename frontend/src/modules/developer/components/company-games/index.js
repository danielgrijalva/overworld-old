import React from "react";
import CoverLoader from "../../../app/components/loaders/CoverLoader";
import ContentLoader from "react-content-loader";
import { Cover } from "../../../app/components";

const CompanyGames = ({company, games}) => {

  const heading = company.name ? (
    <>
      <span style={{ fontSize: "18px" }}>Discover Games By</span>
      <h1
        style={{
          marginBottom: "40px",
          marginTop: "0px",
          display: "block"
        }}
      >
        {company.name}
      </h1>
    </>
  ) : (
    <ContentLoader
      height={15}
      width={120}
      speed={1}
      primaryColor="#242b34"
      secondaryColor="#343d4c"
    >
      <rect x="0" y="0" rx="0" ry="0" width="80" height="7" />
    </ContentLoader>
  )
  
  const gamesListing = Object.keys(games).length > 0 ? (
    games.map((g, i) => {
      if (g.cover) {
        return (
          <Cover
            key={i}
            imageId={g.cover.image_id}
            slug={g.slug}
            size="small"
          />
        );
      }
    })
  ) : (
    <CoverLoader
      rows={3}
      columns={5}
      coverHeight={85}
      coverWidth={60}
      padding={5}
    />
  )

  return <>{heading}{gamesListing}</>;
};

export default CompanyGames;
