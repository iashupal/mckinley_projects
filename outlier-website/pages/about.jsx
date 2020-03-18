import React from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import TileTeaser from '../components/TileTeaser';
import TileTeaserImg from '../components/TileTeaserImg';
import TileTeaserContent from '../components/TileTeaserContent';
import TileTeaserHeading from '../components/TileTeaserHeading';
import TileTeaserDesc from '../components/TileTeaserDesc';

function About() {
  return (
    <Layout heroText="I doubt, therefore I think, therefore I am.">
      <TileTeaser>
        <TileTeaserImg src="https://images.unsplash.com/photo-1476231790875-016a80c274f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        <TileTeaserContent>
          <TileTeaserHeading>어떤 사람들이 있나요?</TileTeaserHeading>
          <TileTeaserDesc>
            나의 정체성을 찾고 싶은 사람들. 스스로를 끊임 없이 탐구하고자 하는
            열망을 가진 사람들이 있어요.
          </TileTeaserDesc>
        </TileTeaserContent>
      </TileTeaser>
      <TileTeaser>
        <TileTeaserImg src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        <TileTeaserContent>
          <TileTeaserHeading>꼭 그들과 함께 찾아야 하나요?</TileTeaserHeading>
          <TileTeaserDesc>
            과연 정체성은 나 혼자만이 만들어낸 걸까요? 우리는 타인 속에서 나의
            정체성을 붙잡습니다. 나와 링크된 수많은 개성들 만큼이나 다양해지는
            관계 양상들, 그러한 다양성을 두르고 있는 동시에 다양성의 그물 한
            가운데 내가 있죠.
          </TileTeaserDesc>
        </TileTeaserContent>
      </TileTeaser>
      <TileTeaser>
        <TileTeaserImg src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        <TileTeaserContent>
          <TileTeaserHeading>왜 정체성을 찾아야하는데요?</TileTeaserHeading>
          <TileTeaserDesc>
            결국, 나의 행복 때문이죠. 자신이 나아갈 방향을 알고 여유를 가지며
            사는 사람들은 자신의 삶을 낙원처럼 꾸밀 줄 압니다. 또, 그들은
            자기자신 속에서 스스로의 세계를 창조하죠. 그런 사람만이 진정으로
            행복한 사람 아닐까요? 마음 속에 항상 자유의 감정을 지니고, 언제든
            고통을 이겨낼 수 있으니까요.
          </TileTeaserDesc>
        </TileTeaserContent>
      </TileTeaser>
      <TileTeaser>
        <TileTeaserImg src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        <TileTeaserContent>
          <TileTeaserHeading>그럼.. 어떻게 찾을 수 있죠?</TileTeaserHeading>
          <TileTeaserDesc>
            내가 하는 생각들. 내가 보는 장면들. 내가 듣는 소리들을 기록해요.
            여기까지는 내가 정의하는 나. 그리고, 나의 기록들을 보고 타인이
            정의하는 내 모습도 동시에 바라봐요. 참, 비공개가 원칙이니 걱정
            마세요. 나를 공개하는 권한은 나에게만 있거든요.
          </TileTeaserDesc>
        </TileTeaserContent>
      </TileTeaser>

      <Heading>
        아웃라이어스만의 특별함은 뭘까요?
        <br />
        <br />
        대답은 간단합니다. 정말로요.
      </Heading>
      <TileTeaser>
        <TileTeaserImg src="../static/images/about_img-1.jpg" />
        <TileTeaserContent>
          <TileTeaserHeading>Our Team</TileTeaserHeading>
          <TileTeaserDesc>
            아웃라이어스의 가장 큰 자산입니다. 고객 에게 전하고자 하는 가치를
            발빠르 게 전달할 수 있는 최고의 팀원들이 있기에, 아웃라이어스가
            있습니다.
          </TileTeaserDesc>
        </TileTeaserContent>
      </TileTeaser>
      <TileTeaser>
        <TileTeaserImg src="../static/images/about_img-2.jpg" />
        <TileTeaserContent>
          <TileTeaserHeading>Our Mission</TileTeaserHeading>
          <TileTeaserDesc>
            나에 대해 찾고 싶은 게 무엇이든, 함께 하겠습니다. 빠르게 변화하는
            세상에서, 나의 시공간에 집중합니 다. 변화를 통해 성장하며 우리의 손
            으로 시장을 혁신합니다.
          </TileTeaserDesc>
        </TileTeaserContent>
      </TileTeaser>
      <TileTeaser>
        <TileTeaserImg src="../static/images/about_img-3.jpg" />
        <TileTeaserContent>
          <TileTeaserHeading>Our Philosophy </TileTeaserHeading>
          <TileTeaserDesc>
            천국을 만드는 방법은 간단하다. 가까이 있는 사람을 사랑하면 된다.
            지옥을 만드는 방법도 간단하다. 가까이 있는 사람을 미워하면 된다.
            나를 넘어서야 이곳을 떠나고, 나를 이겨내야 그곳에 이른다. 나를
            다스려야 뜻을 이룬다. 결국 모든 것은 내 자신에 달려 있 다.
          </TileTeaserDesc>
        </TileTeaserContent>
      </TileTeaser>
    </Layout>
  );
}

export default About;
