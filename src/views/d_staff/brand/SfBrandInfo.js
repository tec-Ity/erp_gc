import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { get_Prom} from "../../a_global/Api";
import { Button,} from "react-bootstrap";
import {
  BrandInfoNav,
  BrandInfoTitle,
  BrandInfoForm,
} from "../../b_component/brands/brandInfo/index";
import InfoImageSection from "../../a_global/image/InfoImageSection";

export default function SfBrandInfo(props) {
  const [homeLink] = useState(props.homeLink);
  const { _id } = useParams();
  const [brandInfo, set_brandInfo] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Brand/" + _id);
      set_brandInfo(result.data?.object);
       
    }
    func();
  }, [_id, ]);


  return (
    <div className='container'>
      <BrandInfoNav homeLink={homeLink} brandInfo={brandInfo} />
      <BrandInfoTitle
        _id={_id}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        homeLink={homeLink}
      />
      <hr />

      <BrandInfoForm
        _id={_id}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        brandInfo={brandInfo}
        set_brandInfo={set_brandInfo}
      />
      <hr className='my-4' />
      {brandInfo && (
        <InfoImageSection
          _id={_id}
          infoImage={[brandInfo?.img_url]}
          sectionName='εη'
          sectionApi='Brand'
          isSingle
        />
      )}

      <Link to={homeLink+'/brands'}>
        <Button variant='primary' className='mt-5'>
          θΏε
        </Button>
      </Link>
    </div>
  );
}
